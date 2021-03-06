import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DialogTitle from '@material-ui/core/DialogTitle'
import Select from '@material-ui/core/Select';
import Accordion from '@material-ui/core/Accordion';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Amplify from 'aws-amplify';
import {API, graphqlOperation} from 'aws-amplify';
import awsconfig from '../aws-exports';
import "./styles.css";
import {updateRecordTable as UpdateTableMutation} from '../graphql/mutations';

Amplify.configure(awsconfig)



const useStyles = makeStyles({
    bullet: {
      display: 'inline-block',
      margin: '0 12px',
      transform: 'scale(2)',
    },
    title: {
        fontSize: 25,
    },
    heading: {
      fontSize: 25,
      fontWeight:600
    },
    subtitle: {
        fontSize: 15,
    },
    dialogSize:{
    },
    buttonColouring:{
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    dropdown:{
      borderColor: '#0062cc',
      boxShadow: '1px 2px 1px 3px #9E9E9E',
      backgroundColor: "#edecf2"
    },
    TextField: {
        backgroundColor: "#fff"
      }
  });
  
export default function AddForm() {
    const [fullWidth] = React.useState(true);
    const [category, setCategory] = React.useState('');
    const [dept, setDept] = React.useState('');
    const [shift, setShift] = React.useState('');
    const [agreement, setAgreement] = React.useState('');
    const [sentiment, setSentiment] = React.useState('');
    const [content,setContent] = React.useState('');


    const handleContentChange = (event) =>{
      setContent(event.target.value.toString().slice(0,300));
    };
    const handleCatChange = (event) => {
      setCategory(event.target.value);
    };
    const handleDeptChange = (event) => {
      setDept(event.target.value);
    };
    const handleShiftChange = (event) => {
      setShift(event.target.value);
    };
    const handleSentimentChange = (event) => {
      setSentiment(event.target.value);
    };
    const handleAgreementChange = (event) => {
      setAgreement(event.target.value);
    };
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const bull = <span className={classes.bullet}>•</span>;

  const handleClose = () => {
    setOpen(false);
  };

  async function addContact() {
    try{
    const record = {
        name: "TEST_NAME",
        category: category,
        Department: dept,
        Steniment: sentiment,
        Shift: shift,
        id: "TESTID",
        description: content
    }
    console.log(record);
    await API.graphql(graphqlOperation(UpdateTableMutation,{ input: record }));
  }
  catch(error){
    console.log(error)
  }
  }
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div >
      <AddSharpIcon display="inline-flex" color="inherit" onClick={handleClickOpen('paper')}>Add</AddSharpIcon>
      <Dialog
        fullWidth={fullWidth}
        maxWidth="lg"
        className={classes.dialogSize}
        open={open}
        onClose={handleClose}
        scroll={scroll}
      >
        <DialogTitle id="scroll-dialog-title">Add Feedback</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>

        <Accordion   component="h1" variant="h5" className={classes.dropdown}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
          <Typography className={classes.heading}>Feedback Entry Guide</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography variant="h6" color="textPrimary" gutterBottom>                
            To support feedback response and data analysis to identify trending issues - and to prioritise subsequent actions, please follow the guidance below when entering Associate feedback:-
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography variant="body1" color="textPrimary" gutterBottom>                
            {bull} Feedback entry must support Associate anonymity (no names /logins)
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography variant="body1" color="textPrimary" gutterBottom>                
            {bull} Enter one feedback per subject/issue raised
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography variant="body1" color="textPrimary" gutterBottom>                
            {bull} Use a maximum of 250 characters per feedback
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography variant="body1" color="textPrimary" gutterBottom>                
            {bull} Where amenities, locations and processes are raised as an issue, please be concise and accurate in their description
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography variant="body1" color="textPrimary" gutterBottom>                
            {bull} Choose the correct dropdown/categories carefully
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography variant="body1" color="textPrimary" gutterBottom>                
            {bull} The expectation is that Feedback entry should not take more than 10/15 minutes
          </Typography>
        </AccordionDetails>
        </Accordion>

                <TextField
                  className={classes.TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  multiline
                  id="content"
                  label="Content"
                  name="content"
                  value = {content}
                  onInput = {handleContentChange}/>

                <FormControl fullWidth={fullWidth}>
                  <InputLabel htmlFor="selected-category">Category</InputLabel>
                  <Select
                  className = {classes.Select}
                  labelId = "demo-simple-select-label"
                  id="category"
                  label = "Category"
                  value={category}
                  onChange={handleCatChange}> 
                    
                    <MenuItem value = {"Career/Advancement Opportunities/Training"}>Career/Advancement Opportunities/Training</MenuItem>
                    <MenuItem value = {"Change One Thing (Group Agreement)"}>Change One Thing (Group Agreement)</MenuItem>
                    <MenuItem value = {"Communication"}>Communication</MenuItem>
                    <MenuItem value = {"Engagement/Recognition"}>Engagement/Recognition</MenuItem>
                    <MenuItem value = {"Equipment"}>Equipment</MenuItem>
                    <MenuItem value = {"Fairness"}>Fairness</MenuItem>
                    <MenuItem value = {"General Questions"}>General Questions</MenuItem>
                    <MenuItem value = {"Leaders/Managers/Culture"}>Leaders/Managers/Culture</MenuItem>
                    <MenuItem value = {"Other - not in category"}>Other - not in category</MenuItem>
                    <MenuItem value = {"Pay/Benefits/Time Off"}>Pay/Benefits/Time Off</MenuItem>
                    <MenuItem value = {"Policioutes and Procedures"}>Policies and Procedures</MenuItem>
                    <MenuItem value = {"Process Improvements/Operations"}>Process Improvements/Operations</MenuItem>
                    <MenuItem value = {"Security"}>Security</MenuItem>
                    <MenuItem value = {"Sustainability"}>Sustainability</MenuItem>
                    <MenuItem value = {"Teamwork"}>Teamwork</MenuItem>
                    <MenuItem value = {"Transportation Commute"}>Transportation Commute</MenuItem>
                    <MenuItem value = {"Working conditions/Facilities"}>Working conditions/Facilities</MenuItem>
                    <MenuItem value = {"SpecAudit"}>Specific Audit</MenuItem>
                    <MenuItem value = {"Safety/Medical Concerns"}>Safety/Medical Concerns</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth={fullWidth}>
                  <InputLabel htmlFor="selected-category">Department</InputLabel>
                  <Select
                  className = {classes.Select}
                  labelId = "demo-simple-select-label"
                  id="dept"
                  label = "Department"
                  value={dept}
                  onChange={handleDeptChange}> 
                    <MenuItem value = {"ISS"}>ISS</MenuItem>
                    <MenuItem value = {"ICQA"}>ICQA</MenuItem>
                    <MenuItem value = {"FLOW"}>FLOW</MenuItem>
                    <MenuItem value = {"RME"}>RME</MenuItem>
                    <MenuItem value = {"TOM"}>TOM</MenuItem>
                    <MenuItem value = {"HR"}>HR</MenuItem>
                    <MenuItem value = {"Change"}>Change</MenuItem>
                    <MenuItem value = {"WFS"}>WFS</MenuItem>
                    <MenuItem value = {"L&D"}>Learning and Development</MenuItem>
                    <MenuItem value = {"Stores"}>Stores</MenuItem>
                    <MenuItem value = {"IT"}>IT</MenuItem>
                    <MenuItem value = {"IB Dock"}>IB Dock</MenuItem>
                    <MenuItem value = {"IB Receive"}>IB Receive</MenuItem>
                    <MenuItem value = {"OB Dock"}>OB Dock</MenuItem>
                    <MenuItem value = {"OB Palletize"}>OB Palletize</MenuItem>                    
                  </Select>
                </FormControl>

                <FormControl fullWidth={fullWidth}>
                  <InputLabel htmlFor="selected-category">Shift pattern</InputLabel>
                  <Select
                  className = {classes.Select}
                  labelId = "demo-simple-select-label"
                  id="shift"
                  label = "Shift"
                  value={shift}
                  onChange={handleShiftChange}> 
                    <MenuItem value = {"FED"}>Front End Days</MenuItem>
                    <MenuItem value = {"BED"}>Back End Days</MenuItem>
                    <MenuItem value = {"DND"}>Doughnut Days</MenuItem>
                    <MenuItem value = {"FEN"}>Front End Nights</MenuItem>
                    <MenuItem value = {"BEN"}>Back End Nights</MenuItem>
                    <MenuItem value = {"DNN"}>Doughnut Nights</MenuItem>                   
                  </Select>
                </FormControl>

                <FormControl fullWidth={fullWidth}>
                  <InputLabel htmlFor="selected-category">Sentiment</InputLabel>
                  <Select
                  className = {classes.Select}
                  labelId = "demo-simple-select-label"
                  id="sentiment"
                  label = "Sentiment"
                  value={sentiment}
                  onChange={handleSentimentChange}> 
                    <MenuItem value = {"Positive"}>Positive</MenuItem>
                    <MenuItem value = {"Neutral"}>Neutral</MenuItem>  
                    <MenuItem value = {"Negative"}>Negative</MenuItem>                
                  </Select>
                </FormControl>

                <FormControl fullWidth={fullWidth}>
                  <InputLabel htmlFor="selected-category">Associates Agree</InputLabel>
                  <Select
                  className = {classes.Select}
                  labelId = "demo-simple-select-label"
                  id="agreement"
                  label = "Agreement"
                  value={agreement}
                  onChange={handleAgreementChange}> 
                    <MenuItem value = {"1"}>1</MenuItem>
                    <MenuItem value = {"2"}>2</MenuItem>  
                    <MenuItem value = {"3"}>3</MenuItem>    
                    <MenuItem value = {"4"}>4</MenuItem>
                    <MenuItem value = {"5"}>5</MenuItem>  
                    <MenuItem value = {"6"}>6</MenuItem>    
                    <MenuItem value = {"7"}>7</MenuItem>
                    <MenuItem value = {"8"}>8</MenuItem>  
                    <MenuItem value = {"9"}>9</MenuItem>  
                    <MenuItem value = {"10"}>10</MenuItem>          
                  </Select>
                </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addContact} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}