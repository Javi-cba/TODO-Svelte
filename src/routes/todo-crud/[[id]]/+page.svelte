<script lang="ts">
    import { page } from '$app/stores';
    let pageId: string = $page.params.id;


    import type { PageData } from "./$types";
    import SettingsForm from "./settings-form.svelte";
    let { data }: { data: PageData } = $props();


  
  </script>
  
<SettingsForm id={pageId} data={data} />
