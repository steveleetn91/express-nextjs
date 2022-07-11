import Head from 'next/head'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from "@mui/material/AlertTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const CategoriesUI = [];
const ListTaskUI = [];
export default function Home() {
  const [ErrorMessage, setErrorMessage] = useState("");
  const [TaskName, setTaskName] = useState("");
  const [selectCat, setSelectCat] = useState("education");
  const [loadingList,setLoadingList] = useState(false);
  const [loadingSave,setLoadingSave] = useState(false);
  const [loadingUpdateComplete,setLoadingUpdateComplete] = useState(false);
  const [loadingDelete,setLoadingDelete] = useState(false);
  const [loadingUpdate,setLoadingUpdate] = useState(false);
  const [itemUpdate,setItemUpdate] = useState({});
  const saveTask = () => {
    if (TaskName === "" || selectCat === "") {
      return false;
    }
    if(loadingSave === true) {
      return false;
    }
    setLoadingSave(true);
    fetch(process.env.API_HOST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        TaskName: TaskName,
        TaskCategory: selectCat
      })
    }).then((resp) => {
      setTaskName("");
      setSelectCat("");
      setLoadingSave(false);
      getListTaskUI();
    });
  }
  const updateTask = () => {
    if (TaskName === "" || selectCat === "") {
      return false;
    }
    if(loadingSave === true) {
      return false;
    }
    setLoadingSave(true);
    fetch(process.env.API_HOST + "/" + itemUpdate.TaskID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        TaskName: TaskName,
        TaskCategory: selectCat,
        TaskCompleted : itemUpdate.TaskCompleted
      })
    }).then((resp) => {
      setTaskName("");
      setSelectCat("");
      setItemUpdate({});
      setLoadingSave(false);
      getListTaskUI();
    });
  }
  const TaskForm = () => {
    if(itemUpdate && itemUpdate.TaskID && itemUpdate.TaskID > 0) {
      updateTask();
    } else {
      saveTask();
    }
  }
  const getListTaskUI = () => {
    if(loadingList === true ) {
      return false;
    }
    setLoadingList(true);
    fetch(process.env.API_HOST).then(async (resp) => {
      if (resp.status === 200) {
        let result = await resp.json();
        ListTaskUI = [];
        result.data.forEach((item, index) => {
          ListTaskUI.push(
          <li className="list-group-item" key={index}>
            <div className='row'>
              <div className='col-2'><Checkbox label={item} key={index} onClick={() => {
                updateComplete(item)
              }} checked={item.TaskCompleted} /></div> 
              <div className='col-7'><p><b><i>{item.TaskCategory}</i></b></p>
              <p>{item.TaskName}</p></div>
              <div className='col-3'>
                <EditIcon className='text-primary' onClick={() => {
                  selectUpdateTaskInfo(item);
                }}></EditIcon>
              <DeleteIcon className='text-danger' onClick={() => {
                deleteTask(item);
              }}></DeleteIcon></div> 
            </div>
          </li>)
        });
      }
      setLoadingList(false);
    });
  }
  const randomTask = () => {
    setItemUpdate({});
    fetch("http://www.boredapi.com/api/activity/", {
      method: "GET"
    }).then(async (resp) => {
      console.log(resp.status);
      if (resp.status !== 200) {
        setErrorMessage("System can't get data");
      } else {
        /**
         * 200 
         */
        let result = await resp.json();
        setTaskName(result.activity);
        setSelectCat(result.type);
      }
    })
  }
  const selectUpdateTaskInfo = (item) => {

    setItemUpdate(item);
    setTaskName(item.TaskName);
    setSelectCat(item.TaskCategory);
  }
  const updateComplete = (item) => {
    if(loadingUpdateComplete === true ) {
      return false;
    }
    setLoadingUpdateComplete(true);
    item.TaskCompleted = item.TaskCompleted === true ? false : true;
    fetch(process.env.API_HOST + "/" + item.TaskID,{
      method : "PUT",
      headers : {"Content-Type":"application/json"},
      body:JSON.stringify(item)
    }).then(async (resp) => {
      if(resp.status === 200 ) {
        getListTaskUI();
      }
      setLoadingUpdateComplete(false);
    });
  }
  const deleteTask = (item) => {
    if(loadingDelete === true ) {
      return false;
    }
    setLoadingDelete(true);
    if(confirm("Do you wanana destroy it?")) {
      fetch(process.env.API_HOST + "/" + item.TaskID,{
        method : "Delete",
        headers : {"Content-Type":"application/json"}
      }).then( async (resp) => {
        if(resp.status === 200 ) {
          getListTaskUI();
        }
        setLoadingDelete(false);
      });
    }
  }
  useEffect(() => {
    // ListTaskUI 
    getListTaskUI();
    // CategoriesUI 
    fetch(process.env.API_HOST + "/category").then(async (resp) => {
      if (resp.status === 200) {
        let result = await resp.json();
        result.data.forEach((item) => {
          CategoriesUI.push(<MenuItem key={item} value={item}>{item}</MenuItem>)
        });
      }
    });
  }, []);
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography variant="h4" className='text-uppercase mb-4 mt-4'>
          Welcome to GreenYellow
        </Typography>
        {ErrorMessage.length > 0 ? <Alert severity="error" className='mb-4'>
          <AlertTitle>Error</AlertTitle>
          {ErrorMessage}
        </Alert> : ''}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant='h5' className='mb-4'>
                    TO-DO Task
                  </Typography>
                  <TextField fullWidth label="Name" id="name" value={TaskName}
                    onChange={(event) => setTaskName(event.target.value)} />
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectCat}
                    defaultValue={selectCat}
                    label="Task Category"
                    onChange={(event) => {
                      setSelectCat(event.target.value);
                    }}
                    className="mt-3"
                  >
                    {CategoriesUI}

                  </Select>
                </CardContent>
                <CardActions>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <Button variant="outlined" onClick={randomTask}>Random</Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button variant="contained" onClick={TaskForm}>Submit</Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <ul className='list-group'>
                  {ListTaskUI}
                  </ul>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </main>

      <footer className='mt-5 text-uppercase'>
        <Typography variant="h6">
          2022@nasa.com
        </Typography>
      </footer>
    </div>
  )
}
