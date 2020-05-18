<template>
	<div id="app">
		<v-header/>
		<div class="content">
			<router-view/>
		</div>
	</div>
</template>

<script>
import vHeader from '@/components/header';

export default {
	name: 'app',
	components: {
		vHeader,
	},
};
</script>
