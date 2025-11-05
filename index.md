---
# https://vitepress.dev/reference/default-theme-home-page
layout: page

---

![image](https://cdn.jsdelivr.net/gh/Dantezhenniubi/image-repo@master/4ba7630e0cf3d7ca2d26c9b2b71fbe096963a9ac.jpg)

<LinkCard url="https://vitepress.yiov.top/" title="Vitepress中文搭建教程" description="https://vitepress.yiov.top/" logo="https://vitepress.yiov.top/logo.png"/>

<div class="bg-[url(/bg-canvas.png)]! bg-fixed">
    <p>ssssss</p>
</div>


:::raw

<div class="overflow-hidden">
    <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="relative mx-auto max-w-4xl grid space-y-5 sm:space-y-10">
            <!-- Title -->
            <div class="text-center">
                <p class="text-xs font-semibold text-gray-500 uppercase mb-3">
                    Hello, Friend!
                </p>
                <h1 class="text-3xl text-gray-800 font-bold sm:text-5xl lg:text-6xl lg:leading-tight">
                    Your are looking at <span class="text-blue-500">Tailwind Content</span>
                </h1>
            </div>
        </div>
    </div>
</div>

<ShinyText class="text-3xl"
    text="Just some shiny text!" 
    :disabled="false" 
    :speed="3" 
    class-name="your-custom-class"
    twLinearConfig="bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal] dark:bg-linear-[25deg,red_5%,white_60%,blue_90%,teal]"
/>

<CurvedLoop
    marquee-text="Be ✦ Creative ✦ With ✦ Vue ✦ Bits ✦"
    :speed="2"
    :curve-amount="3400"
    direction="left"
    :interactive="true"
    textColor="fill-blue-500"
/>
<CurvedLoop
    marquee-text="Be ✦ Creative ✦ With ✦ Vue ✦ Bits ✦"
    :speed="2"
    :curve-amount="10"
    direction="left"
    :interactive="true"
    textColor="fill-blue-500"
/>

<FuzzyText class="shadow-amber-300"
    text="404错误"
    :font-size="140"
    font-weight="900"
    font-family="PingFangZF"
    color="blue"
    :enable-hover="true"
    :base-intensity="0.18"
    :hover-intensity="0.5"
/>



:::
<testcomponents />
<RadialMotion />
