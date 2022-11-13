export default function Input({type, className, ...props}) {
  return (
    <input type={type} {...props} className={`${
      className
        ? className
        : "w-full mb-5 rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-gray-200 transition duration-300 bg-gray-100"
    }`}/>
  )
}
