import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

const DashbordModulesPage = () => {
    const modules: any[] = [
        {
            title: 'BCS',
            subTitle: 'previous questions',
            // description: 'A collection of past BCS exam questions',
            totalCourse: 9,
            duration: 0,
            isPopular: true,


        },
        {
            title: 'BCS',
            subTitle: 'complete preparation',
            // description: 'Complete preparation course for BCS exams.',
            totalCourse: 17,
            duration: 0,
            isPopular: true,
        },
        {
            title: 'Bank Jobs',
            subTitle: 'complete preparation',
            // description: 'Complete preparation course for BCS exams.',
            totalCourse: 17,
            duration: 0,
            isPopular: true,
        },
        {
            title: 'Govment Jobs',
            subTitle: 'complete preparation',
            // description: 'Complete preparation course for BCS exams.',
            totalCourse: 17,
            duration: 0,
            isPopular: true,
        },
        {
            title: 'Class 6,7,8',
            subTitle: 'complete preparation',
            // description: 'Complete preparation course for BCS exams.',
            totalCourse: 17,
            duration: 0,
            isPopular: true,
        },
        {
            title: 'Class 9,10',
            subTitle: 'complete preparation',
            // description: 'Complete preparation course for BCS exams.',
            totalCourse: 14,
            duration: 0,
            isPopular: true,
        },
        {
            title: 'Class 11,12',
            subTitle: 'complete preparation',
            // description: 'Complete preparation course for BCS exams.',
            totalCourse: 16,
            duration: 0,
            isPopular: true,
        },
    ];

    return (
        <>

            <div>
                <Table>
                    <TableCaption>Module List</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Subtitle</TableHead>
                            <TableHead>Total course</TableHead>
                        </TableRow>
                    </TableHeader>


                    <TableBody>
                        {
                            modules.map((module) => (
                                <TableRow key={module.id}>
                                    <TableCell>{module.title}</TableCell>
                                    <TableCell>{module.subTitle}</TableCell>
                                    <TableCell>{module.totalCourse}</TableCell>

                                </TableRow>

                            ))
                        }
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>

                        </TableRow>
                    </TableFooter>

                </Table>
            </div>



        </>
    )
};

export default DashbordModulesPage;