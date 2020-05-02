import React from "react";
import {Formik, Field, ErrorMessage, FieldArray} from "formik";
import  * as Yup from "yup";
export default class TestForm extends React.Component{

    constructor(props) {
        super(props);
    }

    onsubmit=(values)=>{
       // console.log(values['address']['city_name'])
        console.log(values);
    }


    first_name_error_message=()=> {
        return (<span>First name is mandatory</span>)
    }

    last_name_error_message=()=> {
        return (<span>Last name is mandatory</span>)
    }


    city_name_error_message=()=>{
        return (<span>City name is mandatory</span>)
    }

    form_code=(props)=>{
        return <form onSubmit={props.handleSubmit}>


                 <label>First name</label>
                 <Field name={'first_name'}/>
                 <ErrorMessage name={'first_name'} render={this.first_name_error_message} />

                 <br/>

                 <label>Last name</label>
                 <Field name={'last_name'}/>
                 <ErrorMessage name={'last_name'} render={this.last_name_error_message} />

            <br/>

                <label>Major</label>
                <Field name={'major'} component={'select'}>
                     <option value={'CS'}>CS</option>
                     <option value={'CE'}>CE</option>
                 </Field>

            <br/>
                 <label>swimming</label>
                 <Field name={'swimming'} type={'checkbox'}/>
                 <label>Reading</label>
                 <Field name={'reading'} type={'checkbox'}/>

            <br/>

                 <label>Sex</label>
                 <Field type={'radio'} name={'sex'} value={'male'}/> male
                 <Field type={'radio'} name={'sex'} value={'female'}/> female
            <br/>

            <label>City name</label>
            <Field name={'address.city_name'}/>
            <ErrorMessage name={'address.city_name'}  render={this.city_name_error_message} />
            <br/>

            <label>Home No</label>
            <Field name={'address.home_no'}/>
            <ErrorMessage name={'address.home_no'}  />
            <br/>

            <label>Street Name</label>
            <Field name={'address.street_name'}/>
            <ErrorMessage name={'address.street_name'}  />
            <br/>

            <FieldArray name={'courses'}

               render={
                   arrayHelper=>(
                       <div>
                           {props.values.courses.map((item,index)=>(
                               <div key={index}>
                               <Field name={`courses.${index}.name`}/>
                               <ErrorMessage name={`courses.${index}.name`} />
                               <Field name={`courses.${index}.hours`}/>
                               <ErrorMessage name={`courses.${index}.hours`}/>
                               <button type={'button'} onClick={()=>arrayHelper.remove(index)}>-</button>

                               </div>
                               ))}

                       <button type={'button'} onClick={()=>arrayHelper.push({name:'',hours:''})}>+</button>
                       </div>



                   )

               }

            />




                 <button type={'submit'}>Send</button>
              </form>
    }

    form_schema=()=>{
        const schema=Yup.object().shape({
            first_name:Yup.string().required(),
            last_name:Yup.string().required(),
            address:Yup.object().shape({
                city_name:Yup.string().required(),
                home_no:Yup.string().required('Home No is mandatory'),
                street_name:Yup.string().required()
            }
            ),
            courses:Yup.array().of(
              Yup.object().shape({
                 name:Yup.string().required('Name is mandatory'),
                 hours:Yup.string().required('Hours is mandatory')
              })
            )
        });
        return schema;
    }

    render() {
        return(
            <Formik
            initialValues={{first_name:''
                ,last_name:'',
                swimming:false,
                reading:true,
                sex:'female',
                address:{
                    city_name:'',
                    home_no:'',
                    street_name:''
                },
                courses:[
                    {
                        name:'',
                        hours:''
                    },
                    {
                        name:'',
                        hours:''
                    },
                    {
                        name:'',
                        hours:''
                    }
                ]

            }}
            onSubmit={this.onsubmit}
            children={this.form_code}
            validationSchema={this.form_schema}
            />

        )
    }

}