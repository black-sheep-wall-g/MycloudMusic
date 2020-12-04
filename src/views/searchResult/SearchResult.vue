<template>
    <cloud-search-result-content></cloud-search-result-content>
</template>

<script>

    import CloudSearchResultContent from "./children/cloudSearchResultContent";
    export default {
        name: "SearchResult",
        components: {
            CloudSearchResultContent
        }
    }
</script>