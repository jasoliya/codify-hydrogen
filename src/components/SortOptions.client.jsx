import { Listbox } from '@headlessui/react';
import { useServerProps } from '@shopify/hydrogen';
import { useState, Fragment } from 'react';

const sort_options = [
    { id: 1, name: 'Select sorting', value: 'COLLECTION_DEFAULT', unavailable: false },
    { id: 2, name: 'Title', value: 'TITLE', unavailable: false },
    { id: 3, name: 'Price', value: 'PRICE', unavailable: false },
    { id: 4, name: 'Best selling', value: 'BEST_SELLING', unavailable: false },
    { id: 5, name: 'Created', value: 'CREATED', unavailable: true },
    { id: 6, name: 'Manual', value: 'MANUAL', unavailable: false },
]

export function SortOptions() {
    const [sortOption, setSortOption] = useState(sort_options[0]);
    const {serverProps,setServerProps} = useServerProps();

    const handleChange = (option) => {
        setSortOption(option);
        setServerProps('sortKey', option.value);
        setServerProps('pageBy', 4);
    }

    return(
        <div className=' w-60 relative self-end'>
            <Listbox value={sortOption} onChange={handleChange}>
                {({open}) => (
                    <>
                        <Listbox.Button 
                            className={`py-2 px-4 pr-7 border rounded border-gray-300 text-sm cursor-pointer relative w-full text-left ${
                                open ? "rounded-b-none border-b-0" : ""
                            }`}
                            >{sortOption.name}<DownArrow active={open} /></Listbox.Button>
                        <Listbox.Options className=" absolute left-0 right-0 border border-gray-300 rounded-b overflow-hidden">
                            {sort_options.map((sort_option) => (
                                <Listbox.Option key={sort_option.id} value={sort_option} as={Fragment}>
                                    {({ active, selected }) => (
                                    <li
                                        className={` relative py-2 px-3 pl-7 text-sm cursor-pointer z-10 ${
                                        active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                        }`}
                                    >
                                        {selected && <CheckIcon />}
                                        {sort_option.name}
                                    </li>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </>
                )}
            </Listbox>
        </div>
    );
}

function CheckIcon() {
    return (
        <svg className=' w-3 h-3 absolute left-3 top-3 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
    );
}

function DownArrow({active}) {
    return (
        <svg className={` w-3 h-3 absolute right-3 top-3 ${active && " rotate-180"} `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"/></svg>
    )
}