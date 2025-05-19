"use client";

import { Particle } from "@/components/custom-ui/particle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

const AcademyPage = () =>{

    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const handleToggleChange = (values: string[]) => {
        setSelectedItems(values)
    }

    const toggleItems = [
        { value: "bold", title:"Bangla 1st Paper", icon: <Bold className="h-4 w-4" /> },
        { value: "italic", title:"Bangla Secong Paper", icon: <Italic className="h-4 w-4" /> },
        { value: "underline", title:"General Math", icon: <Underline className="h-4 w-4" /> },
    ]

    useEffect(() => {
        console.log("Selected:", selectedItems)

    }, [selectedItems])


    return (
        <>
            <div>
                <Particle title={'Courses'} />
            </div>


            <div className='flex flex-col md:flex-row gap-2 px-6'>
                <div className='md:w-1/4 w-full p-4 pb-10'>

                    <div className='py-2 text-green-900 text-xl'>
                        Select Class
                    </div>

                    <div>
                        <ToggleGroup
                            variant="primary"
                            type="multiple"
                            className='flex flex-col'
                            onValueChange={handleToggleChange}
                            value={selectedItems}
                        >
                            {
                                toggleItems.map((item, index) => (
                                    <ToggleGroupItem
                                        key={index}
                                        value={item.value}
                                        aria-label={`Toggle ${item.value}`}
                                        className='w-full'
                                    >
                                        <h1 className='font-bold'>{item.title}</h1>
                                    </ToggleGroupItem>

                                ))
                            }

                        </ToggleGroup>
                    </div>


                </div>

                <Separator orientation='vertical' className="h-auto w-[1px]"/>

                <div className=' md:w-3/4 w-full p-4'>
                    <div className='mb-2'>
                        Search and others
                    </div>

                    <div>
                        <Table className='w-full  [&>tbody>tr:nth-child(even)]:bg-gray-50'>

                            <TableBody>
                                {
                                    toggleItems.length > 0 && (
                                        toggleItems.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <div>
                                                        <div>
                                                            <h1 className='text-3xl font-bold'>{item.title}</h1>

                                                        </div>

                                                        <div className='flex justify-around gap-3 mt-5'>

                                                            <Button variant='primaryOutline' size={'xsm'}>tag</Button>
                                                            <Button variant='secondaryOutline' size={'xsm'}>MCQ</Button>
                                                            <Button variant='superOutline' size={'xsm'}>Written</Button>
                                                            <Button variant='secondaryOutline' size={'xsm'}>Board Question</Button>
                                                            <Button variant='primaryOutline' size={'xsm'}>Model Test</Button>
                                                            <Button variant='superOutline' size={'xsm'}>Quiz</Button>

                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div>
                                                        <InteractiveHoverButton>Read</InteractiveHoverButton>
                                                    </div>

                                                </TableCell>

                                            </TableRow>
                                        ))
                                    )
                                }

                            </TableBody>

                        </Table>

                    </div>

                </div>
            </div>
        </>
    )
};

export default AcademyPage;