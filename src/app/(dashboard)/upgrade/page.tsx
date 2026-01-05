/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from '@/lib/auth';
import { getQueryClient, trpc } from '@/trpc/server';
import { HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { UpgradeView, UpgradeViewError, UpgradeViewLoading } from '@/modules/premium/ui/view/upgrade-view';

export const dynamic = "force-dynamic";


const Page = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        redirect("/sign-in");
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.premium.getCurrentSubscription.queryOptions()
    );
    void queryClient.prefetchQuery(
        trpc.premium.getProducts.queryOptions()
    );

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<UpgradeViewLoading/>}>
                <ErrorBoundary fallback={<UpgradeViewError/>}>
                    <UpgradeView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default Page;