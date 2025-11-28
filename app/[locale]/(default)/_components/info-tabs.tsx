import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

const InfoTabs = async ({ defaultTab }: { defaultTab?: string }) => {
    const t = await getTranslations('LandingPage.infoTabs');

    const defaultTabValue = ['tekenmeldingen', 'dichtheidkaart', 'lymeinnl'].includes(defaultTab || '') ? defaultTab : 'tekenmeldingen';

    const tabTriggers = [
        {
            value: 'tekenmeldingen',
            label: t('tekenmeldingen.tabTitle')
        },
        {
            value: 'dichtheidkaart',
            label: t('dichtheidkaart.tabTitle')
        },
        {
            value: 'lymeinnl',
            label: t('lymeinnl.tabTitle')
        }
    ]

    return (
        <Tabs
            defaultValue={defaultTabValue}
            className="w-full h-full flex flex-col justify-start items-center gap-0 space-y-0 border border-border rounded-md bg-secondary"
        >
            <div className="w-full flex justify-center">
                <TabsList
                    className="h-auto p-0 rounded-none rounded-t overflow-hidden w-full flex flex-col sm:flex-row"
                >
                    {tabTriggers.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            className={
                                cn(
                                    'text-base',
                                    'rounded-none grow w-full',
                                    'text-primary-foreground bg-primary',
                                    'data-[state=active]:bg-secondary data-[state=active]:font-bold',
                                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:-ring-offset-2'
                                )
                            }
                            value={tab.value}
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}

                </TabsList>
            </div>
            <TabsContent
                className="w-full grow"
                value="tekenmeldingen">


                todo: tekenmeldingen content

            </TabsContent>
            <TabsContent
                className=""
                value="dichtheidkaart">
                todo: dichtheidkaart content
            </TabsContent>
            <TabsContent
                className=""
                value="lymeinnl">
                todo: lymeinnl content
            </TabsContent>
        </Tabs>
    )
}

export default InfoTabs;