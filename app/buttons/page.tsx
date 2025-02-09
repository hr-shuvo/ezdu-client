import { Button } from "@/components/ui/button";


const ButtonPage = () => {
    return (
        <div className='p-4 space-y-4 flex flex-col max-w-[200px]'>
            <p className='text-green-500 font-bold'>Hello EZ-DU</p>

            <Button size='lg' variant='default'>default</Button>
            <Button size='lg' variant='destructive'>destructive</Button>
            <Button size='lg' variant='outline'>outline</Button>
            <Button size='lg' variant='ghost'>ghost</Button>
            <Button size='lg' variant='link'>link</Button>
            <Button size='lg' variant='primary'>primary</Button>
            <Button size='lg' variant='primaryOutline'>primaryOutline</Button>
            <Button size='lg' variant='secondary'>secondary</Button>
            <Button size='lg' variant='secondaryOutline'>secondaryOutline</Button>
            <Button size='lg' variant='danger'>danger</Button>
            <Button size='lg' variant='dangerOutline'>dangerOutline</Button>
            <Button size='lg' variant='super'>super</Button>
            <Button size='lg' variant='superOutline'>superOutline</Button>
            <Button size='lg' variant='sidebar'>sidebar</Button>
            <Button size='lg' variant='sidebarOutline'>sidebarOutline</Button>

            <Button size='lg' variant='locked'>locked</Button>
        </div>
    )
};

export default ButtonPage;