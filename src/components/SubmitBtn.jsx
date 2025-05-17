import {useNavigation} from "react-router-dom"

const SubmitBtn = ({text}) => {
  const navigation = useNavigation()
  // console.log(navigation)

  const isSubmitting = navigation.state === "submitting"
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>
          sending...
        </>
      ) : (
        text
      )}
    </button>
  )
}

export default SubmitBtn
