import { getQueryClient, trpc } from '@/trpc/server';
import { HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';

interface Props {
    params: Promise<{ meetingId: string }>
}

const Page = async ({ params }: Props) => {
    const { meetingId } = await params;
    const queryClient = getQueryClient();
    
    void queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    )

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            
                
                    123
                
            
        </HydrationBoundary>
    )
}

export default Page;