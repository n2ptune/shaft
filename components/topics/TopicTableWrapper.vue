<template>
  <div>
    <table class="w-full">
      <thead>
        <slot name="header">
          <tr>
            <th>asd</th>
            <th>asd2</th>
          </tr>
        </slot>
      </thead>
      <tbody>
        <slot name="default" />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {}
</script>
