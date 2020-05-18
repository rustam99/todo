<template>
	<div class="group-list">
		<template>
			<ul class="group-list__list">
				<li
					v-for="el in list"
					:key="el.id"
					class="group-list__item">
					<group :id="el.id" :title="el.title" :list="el.cards"/>
				</li>
			</ul>
		</template>
	</div>
</template>

<script>
import group from '@/components/group';

export default {
	name: 'groupList',
	props: {
		list: Array,
	},
	components: {
		group,
	},
};
</script>

<style lang="scss">
.group-list {

	&__list {
		list-style-type: none;
	}

	&__item {
		& + & {
			margin-top: 10px;
		}
	}
}

</style>
