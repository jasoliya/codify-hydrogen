import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export function SlideShow() {
    const images = [
        "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    ];
    
    return (
        <Slide>
            <div className=" relative pt-[45%]">
                <div className=' absolute flex items-center justify-center p-10 top-0 left-0 right-0 bottom-0 bg-cover' style={{ 'backgroundImage': `url(${images[0]})` }}>
                    <span>Slide 1</span>
                </div>
            </div>
            <div className=" relative pt-[45%]">
                <div className=' absolute flex items-center justify-center p-10 top-0 left-0 right-0 bottom-0 bg-cover' style={{ 'backgroundImage': `url(${images[1]})` }}>
                    <span>Slide 2</span>
                </div>
            </div>
            <div className=" relative pt-[45%]">
                <div className=' absolute flex items-center justify-center p-10 top-0 left-0 right-0 bottom-0 bg-cover' style={{ 'backgroundImage': `url(${images[2]})` }}>
                    <span>Slide 3</span>
                </div>
            </div>
        </Slide>
    );
}