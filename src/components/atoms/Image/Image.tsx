import React, { ReactEventHandler } from "react";
import "./Image.scss";
type ReactPropsImage = React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
>
type ReactPropsSource = React.DetailedHTMLProps<
    React.SourceHTMLAttributes<HTMLSourceElement>,
    HTMLSourceElement
>
type PropsImage = (ReactPropsImage | ReactPropsSource) & {
    type?: "source" | "img"
}
const ImageComponent = (props: PropsImage) => {
    const customProps = {
        ...props,
        className: ` ${props.className ? props.className : ""}`,
        type: "",
    } as unknown as ReactPropsImage;

    return (
        <>
            {props.type == "source" ? (
                <source
                    onLoad={
                        props.onLoad as
                            | ReactEventHandler<HTMLSourceElement>
                            | undefined
                    }
                    {...(customProps as unknown as ReactPropsSource)}
                />
            ) : (
                <img
                    onLoad={
                        props.onLoad as
                            | ReactEventHandler<HTMLImageElement>
                            | undefined
                    }
                    src={props.src}
                    {...customProps}
                />
            )}
        </>
    );
};
export default ImageComponent;
