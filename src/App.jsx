
import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';


function App() {

  const[height,setHeight] = useState(0)
  const[weight,setWeight] = useState(0)
  const[bmi,setBmi] = useState(0)
  const [bmiDescription, setBmiDescription] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const[isHeight,setIsheight] = useState(true)
  const[isWeight,setIsweight] = useState(true)

  const validate = (e)=>{
    const name=e.target.name
    const value= e.target.value
    console.log(name,value);
    
    if(!!value.match(/^[0-9.]*$/)){
      if(name=='height'){
        setHeight(value)
        setIsheight(true)
      }
      else{
        setWeight(value)
        setIsweight(true)
      }
    }

    else{
      if(name=='height'){
        setHeight(value)
        setIsheight(false)
      }
      else{
        setWeight(value)
        setIsweight(false)
      }
    }
  }
  const handleReset = ()=>{
    setHeight(0)
    setWeight(0)
    setIsheight(true)
    setIsweight(true)
  }

  const handleCalculate = (e)=>{
    e.preventDefault()

    if(height==""&& weight==""){
      alert('please enter the value')
    }
    else{
      const calculatedBmi = (weight / (height * height)) * 10000;
      setBmi(calculatedBmi.toFixed(2));
      setBmiDescription(getBmiDescription(calculatedBmi))
      const description = getBmiDescription(calculatedBmi)
      setImageSrc(getImageSrc(description));


    }

  }
  const getBmiDescription = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      return "Overweight";
    } else {
      return "Obese";
    }
  };

  const getImageSrc = (description) => {
    switch (description) {
      case "Underweight":
        return "https://as2.ftcdn.net/v2/jpg/01/23/13/33/1000_F_123133328_Ew7K4srXhX88cJqs7rzK2WYnEt7xjICo.jpg"; 
      case "Normal weight":
        return "https://www.shutterstock.com/image-vector/pumpedup-sport-fitness-young-man-260nw-703868602.jpg"; 
      case "Overweight":
        return "https://t4.ftcdn.net/jpg/00/53/88/55/360_F_53885536_VFeW9gFYjVL9ckyYauItdeTsZSwkcxHx.jpg"; 
      case "Obese":
        return "https://img.freepik.com/free-vector/hand-drawn-fat-person-cartoon-illustration_23-2150464936.jpg"; 
      default:
        return "https://th.bing.com/th/id/OIP.eeLe2GXyA8M0rjhuTezIBgHaD8?rs=1&pid=ImgDetMain";
    }
  };

  return (
    <>
      <div style={{width:'100%', height:'100vh'}} className='container main d-flex align-items-center justify-content-center' >
        <div style={{ width:'1000px'}} className='container insidiv'>
          
          <div className=" container row w-100 mb-5">
            <h4 className='text-center m-3 fs-1' >BODY MASS INDEX </h4>
            
            <div className="col-md-6 ">
              <form onSubmit={handleCalculate} className='mb-5 mt-5'>
                <div className="mb-5 ms-2 mt-5 w-100">
                <TextField id="outlined-basic" label="Height(cm)" variant="outlined" value={height ||""} className='w-100' fullWidth  onChange={(e)=>validate(e)}  name='height'/>
                  {!isHeight &&
                    <p className='text-danger'> invalid height</p>}
                </div>
                <div className="mb-5 ms-2 mt-5 w-100">
                <TextField id="outlined-basic" label="Weight(Kg)" variant="outlined" value={weight || ""} className='w-100' fullWidth  onChange={(e)=>validate(e)} name='weight'/>
                {!isWeight &&
                  <p className='text-danger'> invalid weight</p>}
                </div>
                <div className="d-flex justify-content-between mt-3 ms-2">
                <Button type='submit' variant="contained" className='w-75' color="warning" disabled={isHeight && isWeight?false:true}>CALCULATE</Button>
                <Button variant="outlined" color="warning" onClick={handleReset}>RESET</Button>
                </div>
                
                
              
              </form>

            </div>
            
            <div className="col-md-6  ">
            <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
            <h5 className='text-center mt-4'>Your BMI Score</h5>
               <h1 className='mt-3 text-center'>{bmi}</h1>
               <h3 className='mb-3 mt-3 text-center'> {bmiDescription}</h3>
            </div>
            <div className="col-md-2"></div>
            </div>
              <div className="row">
                 <div className="col-md-2"></div>
                 <div className="col-md-8">
                 {imageSrc && <img className='ms-5 mt-3 ms-5' src={imageSrc} alt={bmiDescription} width={200} height={200} />}
                 </div>
                 <div className="col-md-2"></div>
              </div>
              
            </div>
          
          </div>

        </div>

      </div>
    </>
  )
}

export default App
