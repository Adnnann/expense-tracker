import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
export default function SelectCurrency({ currency, handleChange, options }) {
  return (
    <div style={{ display: 'inline-flex', marginBottom: '0' }}>
      <FormControl>
        <NativeSelect onChange={handleChange}>
          {options.map((option, index) => {
            return (
              <option key={index} value={options[index]}>
                {options[index]}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
    </div>
  );
}
