import { TextField } from "@material-ui/core";
export default function TextFields(props){
    const { 
        fields, 
        values, 
        changeHandler, 
        labels, 
        id,
        buttonClasses,
        types  
    } = props;
    return fields.map((field, index) => {
        return (
        <TextField
            key={index}
            id={id[index]}
            label={labels[index]}
            className={buttonClasses[index]}
            value={values[index]}
            onChange={changeHandler[index]}
            margin='normal'
            type={types[index]}
        />
        );
    });
    }