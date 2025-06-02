"use client";

import { Particle } from "@/components/custom-ui/particle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { loadAcademicClass } from "../_services/academy/academyService";

const AcademyPage = () => {
    const[isPending, startTransition] = useTransition();

    const [selectedItems, setSelectedItems] = useState<string[]>([])
    // const [selectedItem, setSelectedItem] = useState<string>()

    const [classes, setClasses] = useState<any>([])

    const handleToggleChange = (values: string[]) => {
        setSelectedItems(values)
    }

    useEffect(() => {
        startTransition(async() =>{
            const _classes = await loadAcademicClass(1, 1000);
            setClasses(_classes.data);
        });
    },[]);



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
                                classes.map((item:{_id:string, title:string}, index:number) => (
                                    <ToggleGroupItem
                                        key={index}
                                        value={item._id}
                                        aria-label={`Toggle ${item._id}`}
                                        className='w-full'
                                    >
                                        <h1 className='font-bold'>{item.title}</h1>
                                    </ToggleGroupItem>

                                ))
                            }

                        </ToggleGroup>
                    </div>


                </div>

                <Separator orientation='vertical' className="h-auto w-[1px]" />

                <div className=' md:w-3/4 w-full p-4'>
                    <div className='mb-2'>
                        Search and others
                    </div>

                    <div>
                        <Table className='w-full  [&>tbody>tr:nth-child(even)]:bg-gray-50'>

                            <TableBody>
                                {
                                    classes.length > 0 && (
                                        classes.map((item:any, index:number) => (
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


