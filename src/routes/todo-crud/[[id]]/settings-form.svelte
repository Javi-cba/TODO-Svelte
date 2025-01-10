<script lang="ts">
    import * as Form from "$lib/components/ui/form/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { formSchema, type FormSchema } from "./schema";
    import {
     type SuperValidated,
     type Infer,
     superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    

    let { data, id }: { data: { form: SuperValidated<Infer<FormSchema>> }, id: string } = $props();
    console.log('idantes: ', id);
      if (id) {
  data.form.data = {
    ...data.form.data,
    id,
  }
  ;
}     

    const form = superForm(data.form, {
     validators: zodClient(formSchema),
    });
    
    
    const { form: formData, enhance } = form;


   </script>
    
 <!-- Formulario HTML -->
 <form method="POST" use:enhance>
   <Form.Field {form} name="title">
    <input type="hidden" name="id" value={$formData.id || ''} />

     <Form.Control>
       {#snippet children({ props })} 
         <Form.Label>Título</Form.Label>
         <Input {...props} bind:value={$formData.title} />
       {/snippet}
     </Form.Control>
     <Form.Description>Este es el encabezado del TO-DO.</Form.Description>
     <Form.FieldErrors />
   </Form.Field>
 
   <Form.Field {form} name="description">
     <Form.Control>
       {#snippet children({ props })}
         <Form.Label>Descripción</Form.Label>
         <Input {...props} bind:value={$formData.description} />
       {/snippet}
     </Form.Control>
     <Form.Description>Esta es una descripción adicional.</Form.Description>
     <Form.FieldErrors />
   </Form.Field>
 
   <Form.Button>Submit</Form.Button>
 </form>
 