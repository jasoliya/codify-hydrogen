import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export function Popup({isOpen, onClose, title, children}) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="transition duration-100 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition duration-75 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 bg-black/30 z-50" />
                </Transition.Child>
                
                
                <div className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto ">
                    <div className='flex min-h-full items-center justify-center max-w-sm w-full m-auto'>
                    <Transition.Child
                        as={Fragment}
                        enter="transition duration-100 ease-in"
                        enterFrom="scale-95 opacity-0"
                        enterTo="scale-100 opacity-100"
                        leave="transition duration-100 ease-out"
                        leaveFrom="scale-100 opacity-100"
                        leaveTo="scale-95 opacity-0"
                    >
                        <Dialog.Panel className="p-6 relative mx-auto rounded bg-white w-full">
                            <button className=' absolute top-3 right-3' onClick={onClose}><IconClose /></button>
                            <h3 className=" mb-4">{title}</h3>
                            {children}
                        </Dialog.Panel>
                    </Transition.Child>  
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

function IconClose () {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-label="Close panel" fill="currentColor" stroke="currentColor" className="w-5 h-5"><title>Close</title><line x1="4.44194" y1="4.30806" x2="15.7556" y2="15.6218" strokeWidth="1.25"></line><line y1="-0.625" x2="16" y2="-0.625" transform="matrix(-0.707107 0.707107 0.707107 0.707107 16 4.75)" strokeWidth="1.25"></line></svg>
    );
}