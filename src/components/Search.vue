<!-- <script setup>
import { ref } from 'vue';


</script>

<template>
    <form @submit.prevent="getCharacher">
        <input
          type="search"
          id="characterName"
          class="input"
          v-model="characterName"
          @input="getCharacher"
          list="charactersList"
          placeholder="Search character"
        />
        <datalist id="charactersList">
          <option v-for="name in listOfSuggests" :value="name">
            {{ name }}
          </option>
        </datalist>
        <button class="button" @click="btnSubmit">Submit</button>
      </form>
</template> -->