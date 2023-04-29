

interface PROPS {
  placeholder?: string
  value?: any
  onchange: (e: string) => void
  type?:any
}

export default function InputField({
  placeholder, value, onchange,type
}: PROPS) {
  return <>
    <input
      type={type}
      id="voice-search"
      className="bg-white text-gray-900 text-sm w-full p-2 border rounded focus:ring-0 focus:outline-none"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onchange(e.target.value)}
    ></input>
  </>
}
