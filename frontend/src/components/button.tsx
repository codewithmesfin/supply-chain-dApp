
interface PROPS {
    title: string
    textColor?: string
    bgColor?: string
    onClick: () => void
}

export default function Button({ title, textColor, bgColor, onClick }: PROPS) {

    return (
        <button className={`py-2 px-10 rounded ${bgColor ? bgColor : 'bg-blue-600'} ${textColor ? textColor : 'text-white'}`}
        onClick={onClick}
        >{title}</button>
    )
}
