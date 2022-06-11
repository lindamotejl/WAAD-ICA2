<script>
    export let params;

    function getPercent(poll) {
        const largest = Math.max(...poll.answers.map(o => o.vote))
        for(let i = 0; i < poll.answers.length; i++) {
            if (largest) {
                poll.answers[i].percent = Math.round(poll.answers[i].vote * (100 / largest))
            } else {
                poll.answers[i].percent = 0;
            }
        }
        return poll;
    }

    async function fetchData() {
        const url = '/api/poll/' + params.id;
        const response = await fetch(url)
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;

        if (response.ok) {
            return getPercent(data);
        } else {
            const error = (data && data.message) || response.status;
            throw new Error(error);
        }
    }
</script>

<main>
    {#await fetchData()}
        <h1>Loading...</h1>
    {:then poll}
        <h1>{poll.question}</h1>
        {#each poll.answers as anwr}
            <div class="label">{anwr.answer}</div>
            {#if anwr.percent}
                <div class="bar" style="width:{anwr.percent}%">{anwr.vote}</div>
            {:else}
                <div class="bar zero" style="width:{anwr.percent}%">{anwr.vote}</div>
            {/if}
        {/each}
    {:catch error}
        <h1>{error}</h1>
    {/await}
</main>

<style>
    .bar {
        margin-bottom: 10px;
        padding: 1rem;
        background-color: #feb5ee;
        /*background-image: linear-gradient(90deg, rgb(235, 86, 177) 0%, rgb(241, 41, 198)55);*/
        color: #fff;
        min-width: fit-content;
        transform-origin: 0;
        animation-name: slide;
        animation-duration: 1.6s;
        animation-timing-function: ease-out;
        animation-iteration-count: 1;
    }

    .bar.zero {
        background-color: #ddd;
        background-image: none;
        animation: none;
    }
    @keyframes slide {
        0% {
            color : rgb(255, 255,255, 255);
            transform: scaleX(0)
        }
        90% {
            color: rgb(255, 255, 255)
        }
        100% {
            color: rgb(255, 255, 255);
            transform: scaleX(1);
        }
    }
</style>