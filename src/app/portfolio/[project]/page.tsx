// libraries
import { notFound } from 'next/navigation'

// components
import Banner from '@/components/PortfolioBlocks/Banner'
import MultiText from '@/components/PortfolioBlocks/MultiText'
import FullscreenMedia from '@/components/PortfolioBlocks/FullscreenMedia'
import BigMedia from '@/components/PortfolioBlocks/BigMedia'
import DoubleSlider from '@/components/PortfolioBlocks/DoubleSlider'
import ExpandingGrid from '@/components/PortfolioBlocks/ExpandingGrid'
import TwoMedia from '@/components/PortfolioBlocks/TwoMedia'
import StoriesSlider from '@/components/PortfolioBlocks/StoriesSlider'
import NextProject from '@/components/PortfolioBlocks/NextProject'

// libs
import { getPortfolioBySlug } from '@/lib/wordpress/getPortfolioBySlug'
import { getPortfolioList } from '@/lib/wordpress/getPortfolio'

export default async function Project({
    params
}: {
    params: any
}) {

    const resolved = await params
    const slug = resolved.project

    const project = await getPortfolioBySlug(slug)

    if (!project) {
        notFound()
    }

    const allProjects = await getPortfolioList()
    const index = allProjects.findIndex(p => p.slug === slug)
    const next = index === -1 ? null : allProjects[(index + 1) % allProjects.length]

    function isMultiText(block: any) {
        return block.fieldGroupName === 'PortfolioFieldsMainContentMultiTextLayout'
    }
    
    function isFullscreenMedia(block: any) {
        return block.fieldGroupName === 'PortfolioFieldsMainContentFsMediaLayout' && (block.fs_media_image?.node?.mediaItemUrl || block.fs_media_video?.node?.mediaItemUrl)
    }

    function isBigMedia(block: any) {
        return block.fieldGroupName === 'PortfolioFieldsMainContentBigMediaLayout' && (block.big_media_image?.node?.mediaItemUrl || block.big_media_video?.node?.mediaItemUrl)
    }

    function isDoubleSlider(block: any) {
        return block.fieldGroupName === 'PortfolioFieldsMainContentDoubleSliderLayout' && (block.double_slider_top?.length > 0 || block.double_slider_bottom?.length > 0)
    }

    function isExpandingGrid(block: any) {
        return block.fieldGroupName === 'PortfolioFieldsMainContentExpandingGridLayout' && (block.expanding_grid_media?.length > 0)
    }

    return (
        <main className='portfolio-internal-page'>

            <Banner
                image={project.portfolioFields.bgImage.node.mediaItemUrl}
                category={project.categories.nodes[0]?.name}
                title={project.title}
                subtitle={project.portfolioFields.subtitle}
                text={project.portfolioFields.excerpt}
                client={project.portfolioFields.client}
                year={project.portfolioFields.year}
                area={project.portfolioFields.area}
            />

            <div className='bg-white pt-20 lg:pt-32 pb-px'>
                {project.portfolioFields.mainContent?.map((block: any, i: number) => {
                    if (isMultiText(block)) {
                        return (
                            <MultiText
                                key={i}
                                title={block.multi_text_title}
                                subTitle={block.multi_text_subtitle}
                            >
                                {block.multi_text_content && (
                                    <div dangerouslySetInnerHTML={{ __html: block.multi_text_content }} />
                                )}
                            </MultiText>
                        )
                    }

                    if (isFullscreenMedia(block)) {
                        return (
                            <FullscreenMedia
                                key={i}
                                image={block.fs_media_image?.node?.mediaItemUrl ?? undefined}
                                video={block.fs_media_video?.node?.mediaItemUrl ?? undefined}
                                alt={block.fs_media_alt || ''}
                            />
                        )
                    }

                    if (isBigMedia(block)) {
                        return (
                            <BigMedia
                                key={i}
                                image={block.big_media_image?.node?.mediaItemUrl ?? undefined}
                                video={block.big_media_video?.node?.mediaItemUrl ?? undefined}
                                alt={block.big_media_alt || ''}
                            />
                        )
                    }

                    if (isDoubleSlider(block)) {
                        const top = block.doubleslider_top?.map((item: any) => ({
                            image: item.image?.node?.mediaItemUrl,
                            video: item.video?.node?.mediaItemUrl,
                            alt: item.alt || ''
                        })) || []

                        const bottom = block.doubleslider_bottom?.map((item: any) => ({
                            image: item.image?.node?.mediaItemUrl,
                            video: item.video?.node?.mediaItemUrl,
                            alt: item.alt || ''
                        })) || []

                        return (
                            <DoubleSlider
                                key={i}
                                top={top}
                                bottom={bottom}
                            />
                        )
                    }

                    if (isExpandingGrid(block)) {
                        const media = block.expanding_grid_media?.map((item: any) => ({
                            image: item.image?.node?.mediaItemUrl,
                            video: item.video?.node?.mediaItemUrl,
                            alt: item.alt || ''
                        })) || []

                        return (
                            <ExpandingGrid
                                key={i}
                                media={media}
                            />
                        )
                    }

                    return null
                })}
            </div>

            {next && (
                <NextProject
                    href={`/portfolio/${next.slug}`}
                    image={next.portfolioFields.thumbnail.node.mediaItemUrl}
                    title={next.title}
                />
            )}

        </main>
    )
}