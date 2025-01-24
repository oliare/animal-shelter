import { useState } from 'react';

const PhotoCarousel = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <>
            <div id="indicators-carousel" className="relative w-full" data-carousel="static">
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    {images.map((image, index) => (
                        <div key={index}
                            className={`absolute block w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                            data-carousel-item>
                            <img src={image} alt={`Slide ${index + 1}`} className="absolute block w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                {/* slider indicators */}
                <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                    {images.map((_, index) => (
                        <button key={index} type="button"
                            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-200' : 'bg-zinc-500'}`}
                            aria-current={currentIndex === index ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => goToSlide(index)}
                            data-carousel-slide-to={index}>
                        </button>
                    ))}
                </div>

                {/* slider controls */}
                {images.length > 1 && (
                    <>
                        <button type="button"
                            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            onClick={prevSlide} data-carousel-prev >
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                </svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>
                        <button
                            type="button"
                            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            onClick={nextSlide}
                            data-carousel-next>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="sr-only">Next</span>
                            </span>
                        </button>
                    </>
                )}

            </div>
            <div className="flex justify-center space-x-4 mt-4">
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Thumbnail ${index + 1}`}
                        className={`w-20 h-20 object-cover cursor-pointer rounded-xl ${index === currentIndex ? 'border-4 border-amber-700' : ''}`}
                        onClick={() => goToSlide(index)} />
                ))}
            </div>
        </>
    );
};

export default PhotoCarousel;
