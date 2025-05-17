import {useState} from "react"
import {formatPrice} from "../utils"

const FormRange = ({label, name, size, price}) => {
  const step = 1000
  const maxPrice = 100000 // === $1000.00

  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice)
  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer flex">
        <span className="label-text capitalize">{label}</span>
        <span className="ml-auto">{formatPrice(selectedPrice)}</span>
      </label>
      <input
        type="range"
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        step={step}
        name={name}
        className={`range range-success ${size}`}
      />
    </div>
  )
}

export default FormRange
