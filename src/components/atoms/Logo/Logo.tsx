import React, { DetailedHTMLProps, HTMLAttributes, useState } from "react"
import LogoImg from "/assets/icons/logo.webp"
import LogoImgWhite from "/assets/icons/logowhite.svg"
import { ProgressSpinner } from "primereact/progressspinner"

import "./Logo.scss"
type LogoProps = HTMLAttributes<HTMLDivElement> & {
    imageheight?: string
    type?: "clear" | "dark"
    textclassname?: string
    textstyle?: DetailedHTMLProps<
        HTMLAttributes<HTMLParagraphElement>,
        HTMLParagraphElement
    >
    imageclassname?: string
}
const Logo = (props: LogoProps) => {
    const [loadingImage, setLoadingImage] = useState(true)
    const size = props.imageheight ? props.imageheight : "67px"
    return (
        <div
            {...props}
            className={`logo flex justify-content-center align-items-center ${props.className}`}
        >
            <div
                className="flex justify-content-center"
                style={{ width: size, height: size }}
            >
                <img
                    src={props.type == "clear" ? LogoImg : LogoImgWhite}
                    className={`${
                        loadingImage
                            ? "fadeout animation-duration-1200 animation-fill-forwards "
                            : "fadein animation-duration-1200"
                    } ${props.imageclassname}`}
                    style={{
                        height: `${size}`,
                    }}
                    onLoad={() => setLoadingImage(false)}
                    height={size}
                    alt="Logo"
                    srcSet=""
                />
                <ProgressSpinner
                    style={{
                        height: size,
                        width: size,
                    }}
                    className={` ${
                        !loadingImage
                            ? "fadeout animation-duration-1200 animation-fill-forwards "
                            : "fadein animation-duration-1200"
                    }`}
                />
            </div>

            <p
                className={`${
                    props.type === "clear" ? "text-color-secondary" : "text-50"
                } ml-2 ${props.textclassname}`}
                style={{ ...props.textstyle }}
            >
                {" "}
                Hoteles App
            </p>
        </div>
    )
}

export default Logo
