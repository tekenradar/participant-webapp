import { AspectRatio } from './ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';
import Image from 'next/image';

interface ImageGalleryProps {
    images: Array<{
        src: string;
        alt: string;
        caption: string;
    }>;
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
    return (

        <Carousel

            opts={{
                align: "start",
                loop: true,
            }}
        >
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={image.src}

                    >
                        <AspectRatio
                            ratio={4 / 3}
                            className='w-full'
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className='w-full h-full object-contain'
                            />

                        </AspectRatio>
                        <p className="text-center mt-2 text-sm">
                            <span className="font-bold">
                                {image.caption}
                            </span>
                            <span className="text-muted-foreground ms-2">({`${index + 1} / ${images.length}`})</span>
                        </p>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default ImageGallery;