import React, { useEffect, useState } from "react";
import Image1 from "/assets/img/login/tropical.webp";
import Image1Small from "/assets/img/login/tropical-small.webp";
import Image2 from "/assets/img/login/sea-pool.webp";
import Image2Small from "/assets/img/login/sea-pool-small.webp";
import Image3 from "/assets/img/login/white-sky-umbrella-nobody-party.webp";
import Image3Small from "/assets/img/login/white-sky-umbrella-nobody-party-small.webp";
import "./ImagesBackground.scss";
import ImageComponent from "src/components/atoms/Image/Image";

const images = [
    { name: Image1, nameSmall: Image1Small, alt: "Imagen tropical hotel" },
    {
        name: Image2,
        nameSmall: Image2Small,
        alt: "Imagen mar unido con piscina",
    },
    {
        name: Image3,
        nameSmall: Image3Small,
        alt: "Imagen hotel sombrillas piscina",
    },
];

const ImagesBackgrounds = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [allImagesLoaded, setImagesAllLoaded] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(
                (prevIndex: number) => (prevIndex + 1) % images.length
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (imagesLoaded === images.length)
            setTimeout(() => setImagesAllLoaded(true), 400);
        else return;
        return;
    }, [imagesLoaded, allImagesLoaded]);
    return (
        <div
            className={
                "fadein fadein animation-duration-1000 images-background "
            }
        >
            <div
                className={`${allImagesLoaded ? "show-images" : "hide-images"}`}
            >
                {images?.map?.((img, key) => (
                    <picture key={key}>
                        <ImageComponent
                            media="(min-width:900px)"
                            type="source"
                            srcSet={`${img.name}`}
                            onLoad={() =>
                                !allImagesLoaded &&
                                setImagesLoaded(
                                    (imagesLoaded) => (imagesLoaded += 1)
                                )
                            }
                        />
                        <ImageComponent
                            src={`${img.nameSmall}`}
                            onLoad={() =>
                                !allImagesLoaded &&
                                setImagesLoaded(
                                    (imagesLoaded) => (imagesLoaded += 1)
                                )
                            }
                            className={
                                currentIndex === key
                                    ? "fadein animation-duration-1000 animation-fill-forwards"
                                    : "fadeout animation-duration-1000 animation-fill-forwards"
                            }
                            alt={img.alt}
                        />
                    </picture>
                ))}
            </div>
        </div>
    );
};
export default ImagesBackgrounds;
