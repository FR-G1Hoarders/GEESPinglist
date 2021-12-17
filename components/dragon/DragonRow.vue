<template>
  <div class="mt-3 text-left rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" :class="highlightTheme">
    <div class="justify-around flex-col w-full text-center sm:col-span-2 lg:col-span-1">
      <div class="flex block rounded-lg rounded-b-none items-stretch mb-2 lg:rounded-tr-none lg:rounded-br-lg" :class="textTheme">
        <div class="p-1 flex-1 flex items-center">
          <span class="w-full text-center">
            {{ dragon.name() }} #{{ dragon.id() }}
          </span>
        </div>
        <button @click="$emit('remove')" class="rounded-tr-lg p-1 px-5 text-center lg:rounded-tr-none lg:rounded-br-lg lg:p-0 lg:px-2" :class="buttonTheme">
          X
        </button>
      </div>
      <div class="p-1 hidden lg:inline-block">
        <img :src="dragon.thumbnailImageUrl()"/>
      </div>
    </div>
    <div class="px-4 lg:pt-10 flex-col items-center">
      {{ dragon.gender() }} {{ dragon.breed() }}<br/>
      {{ dragon.flight() }} {{ dragon.eyes() }}<br/>
      {{ dragon.colorPattern() }} {{ dragon.digits() }} Digits<br/>
      <img v-bind:src="'/GEESPinglist/ref/' + dragon.flight() + '.png'" />
    </div>
    <div class="px-4 lg:pt-10 flex-col items-center">
      <span :style="{backgroundColor:dragon.primaryHex()}">&nbsp;&nbsp;</span>&nbsp;
      {{ dragon.primaryColor() }} {{ dragon.primaryGene() }}<br/>
      <span :style="{backgroundColor:dragon.secondaryHex()}">&nbsp;&nbsp;</span>&nbsp;
      {{ dragon.secondaryColor() }} {{ dragon.secondaryGene() }}<br/>
      <span :style="{backgroundColor:dragon.tertiaryHex()}">&nbsp;&nbsp;</span>&nbsp;
      {{ dragon.tertiaryColor() }} {{ dragon.tertiaryGene() }}<br/>
    </div>
    <div class="px-3 mt-2 sm:my-2">
      <input type="text" placeholder="YYYY-MM-DD" v-model="dragon.data.dateOfBirth" class="p-2 block w-full" :class="selectTheme" disabled />
      <label class="block my-1 p-1 px-2 rounded cursor-pointer" :class="textTheme">
        <input type="checkbox" v-model="dragon.data.isBred" disabled /> Bred
      </label>
      <label class="block my-1 p-1 px-2 rounded cursor-pointer" :class="textTheme">
        <input type="checkbox" v-model="dragon.data.hasSilhouette" disabled /> Silhouette
      </label>
      <label class="block my-1 p-1 px-2 rounded cursor-pointer" :class="textTheme">
        <input type="checkbox" v-model="dragon.data.isPermababy" disabled /> Permababy
      </label>
    </div>
    <div class="p-3">
      <select @change="addTag" ref="tagSelect" class="block p-2 rounded-lg mb-2 w-full" :class="selectTheme">
        <option>Add Tag</option>
        <option v-for="(tag, i) in tags" :key="i">{{tag}}</option>
      </select>
      <label v-for="(tag, i) in dragon.tags()" :key="i" @click="dragon.removeTag(i)" class="block m-1 p-2 rounded cursor-pointer" :class="textTheme">
        {{tag}}
        <span class="float-right">X</span>
      </label>
    </div>
  </div>
</template>

<script>
  import tags from '@/data/tags';
  import THEMES from '@/data/themes';
  export default {
    name: 'Dragon',
    props: {
      dragon: {
        type: Object,
        required: true,
      },
      theme: {
		type: String,
		required: true,
	  },
    },
    data() {
      return {
        tags,
      }
    },
	computed: {
		buttonTheme() {
			if (this.theme === "Light") return THEMES["Light"].button;
			else if (this.theme === "Dark") return THEMES["Dark"].button;
		},
		textTheme() {
			if (this.theme === "Light") return THEMES["Light"].text;
			else if (this.theme === "Dark") return THEMES["Dark"].text;
		},
		highlightTheme() {
			if (this.theme === "Light") return THEMES["Light"].highlightText;
			else if (this.theme === "Dark") return THEMES["Dark"].highlightText;
		},
		invalidTheme() {
			if (this.theme === "Light") return THEMES["Light"].invalid;
			else if (this.theme === "Dark") return THEMES["Dark"].invalid;
		},
		selectTheme() {
		  if (this.theme === "Light") return THEMES["Light"].select;
		  else if (this.theme === "Dark") return THEMES["Dark"].select;
	    },
	},
    methods: {
      addTag(e) {
        const select = this.$refs.tagSelect;
        const tag = select.options[select.selectedIndex].text;
        if (tag !== 'Add Tag') {
          this.dragon.pushTag(tag);
        }

        select.selectedIndex = 0;
      },
    },
  }
</script>
