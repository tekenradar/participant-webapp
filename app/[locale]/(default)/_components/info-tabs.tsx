import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

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
                                    'text-base py-2',
                                    'rounded-none grow w-full',
                                    'text-primary-foreground bg-primary',
                                    'data-[state=active]:bg-secondary data-[state=active]:font-bold',
                                    'focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-secondary'
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
                value="tekenmeldingen"
            >

            </TabsContent>
            <TabsContent
                className=""
                value="dichtheidkaart"
            >
                <div className="w-full h-full p-4 flex flex-col gap-4 justify-center items-center">
                    <figure className="flex flex-col gap-4 justify-center items-center">
                        <Image
                            src="/static/images/dichtheidkaart.png"
                            alt="Dichtheidkaart"
                            width={480}
                            height={600}
                        />

                        <figcaption className="text-center text-sm text-balance space-x-1">
                            <span className="font-bold">
                                {t('dichtheidkaart.title')}:
                            </span>
                            <span>
                                {t('dichtheidkaart.description')}
                            </span>
                        </figcaption>
                    </figure>

                </div>

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