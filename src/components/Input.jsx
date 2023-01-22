const Input = (props) => {
  return (
    <div>
      <label
        htmlFor={props.htmlFor}
        key={props.key}
        className='block font-semibold text-[#094067] mt-4'
      >
        {props.label}
      </label>
      <input
        {...props}
        required
        className='mt-2 appearance-none rounded-lg relative block w-full px-3 py-3 border-2 border-[#094067] placeholder-[#90b4ce] text-[#094067] focus:outline-none focus:ring-[#3da9fc] focus:border-[#3da9fc] green:z-10 sm:text-sm'
      />
    </div>
  );
};

export default Input;
