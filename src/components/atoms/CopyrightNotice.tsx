import React from "react";
const CopyrightNotice = (
    props: React.HTMLAttributes<HTMLParagraphElement> & {
        type?: "vertical" | "horizontal"
    }
) => {
    const dateYear = new Date().getFullYear();
    const year = dateYear >= 2023 ? dateYear : 2023;
    return (
        <p {...props}>
            &copy; {year} HotelesApp.{" "}
            {props.type === "horizontal" ? <br /> : ""} All rights reserved.
        </p>
    );
};

export default CopyrightNotice;
