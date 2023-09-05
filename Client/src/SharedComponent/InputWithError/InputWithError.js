import { Input, Alert } from "antd";
const InputWithError = (props) => {
  return (
    <span>
      <Input
        className={props.error ? "" : "form_fields"}
        type='text'
        name={props.fieldName}
        value={props.value}
        onChange={props.handleInputChange}
        placeholder={props.fieldName}
        status={props.error ? "error" : undefined}
      />
      {props.error && (
        <Alert
          className='form_fields'
          message={props.error}
          type='error'
          showIcon
        />
      )}
    </span>
  );
};
export default InputWithError;
