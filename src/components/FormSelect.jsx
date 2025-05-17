const FormSelect = ({label, name, list, defaultValue, size}) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <select
        defaultValue={defaultValue}
        className={`select ${size}`}
        name={name}
      >
        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          )
        })}
        {/* <option disabled={true}>Pick a browser</option>

        <option>FireFox</option>
        <option>Safari</option> */}
      </select>
    </fieldset>
  )
}

export default FormSelect
