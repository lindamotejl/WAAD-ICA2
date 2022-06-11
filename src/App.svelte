<script>
    import Router from 'svelte-spa-router';
    import Home from './routes/Home.svelte';
    import Vote from './routes/Vote.svelte';
    import Result from './routes/Result.svelte';

    const routes = {
        '/': Home,
        '/vote/:id': Vote,
        '/result/:id': Result, 
    };
</script>

<main>
    <Router {routes} />
</main>