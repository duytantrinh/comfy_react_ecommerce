import {Form, Link, useLoaderData} from "react-router-dom"
import FormCheckbox from "./FormCheckbox"
import FormInput from "./FormInput"
import FormRange from "./FormRange"
import FormSelect from "./FormSelect"

const Filters = () => {
  const {meta, params} = useLoaderData()
  // console.log(meta)
  const {search, company, category, shipping, order, price} = params
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={search}
      />
      {/* CATEGORIES SELECT */}
      <FormSelect
        label="category"
        name="category"
        list={meta.categories}
        defaultValue={category}
        size="select-sm"
      />
      {/* COMPANIES SELECT */}
      <FormSelect
        label="select company"
        name="company"
        list={meta.companies}
        defaultValue={company}
        size="select-sm"
      />
      {/* ORDER SELECT */}
      <FormSelect
        label="sort by"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        defaultValue={order}
        size="input-sm"
      />
      {/* PRICE*/}
      <FormRange label="price" name="price" size="range-xs" price={price} />
      {/* SHIPPING */}
      <FormCheckbox
        label="free shipping"
        name="shipping"
        size="checkbox-sm"
        defaultValue={shipping}
      />
      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm ">
        search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        reset
      </Link>
    </Form>
  )
}

export default Filters
