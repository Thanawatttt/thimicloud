import { PropsWithClass } from "@/utils/utils";

interface Props extends PropsWithClass {
    size?: number,
    offsetx?: number
}
export default function IconRepeat({ className, size, offsetx }: Props) {

    const ofx = offsetx ? offsetx : 0;
    return (
        <svg
            className={className}
            width="24"
            height="24"
            viewBox={size ? `${size + ofx} ${size} ${24 - size * 2} ${24 - size * 2}` : `${ofx} 0 24 24`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18.3701 7.99993L13.8701 10.598V8.99993H6.88989V12.9999H4.88989V6.99993H13.8701V5.40186L18.3701 7.99993Z"
                fill="currentColor"
            />
            <path
                d="M10.1299 16.9999H19.1101V10.9999H17.1101V14.9999H10.1299V13.4019L5.62988 15.9999L10.1299 18.598V16.9999Z"
                fill="currentColor"
            />
        </svg>

    )
}