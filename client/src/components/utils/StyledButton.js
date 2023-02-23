import { Button } from '@material-ui/core';
export default function StyledButton(props) {
  const { buttons, variant, clickHandler, color, label } = props;
  console.log(props);
  return (
    <>
      {buttons.map((button, index) => {
        return (
          <Button
            variant={variant[index]}
            onClick={clickHandler[index]}
            style={{ textTransform: 'none', color: color[index] }}
          >
            {label[index]}
          </Button>
        );
      })}
    </>
  );
}
