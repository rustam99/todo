<template>
	<div class="add-group">
		<h1 class="add-group__title">Добавление группы</h1>
		<v-input
			@input="changeTitle"
			class="add-group__input"
			placeholder="Введите название группы"/>
		<div class="add-group__buttons">
			<button @click="addGroup" class="add-group__button button">Создать</button>
			<button @click="goBack" class="add-group__button button button_delete">Отмена</button>
		</div>
	</div>
</template>

<script>
import vInput from '@/components/input';

export default {
	name: 'addGroup',
	data() {
		return {
			title: '',
			groupListLength: '',
		};
	},
	created() {
		this.groupListLength = this.$store.state.groupList.length;
	},
	methods: {
		changeTitle(e) {
			this.title = e;
		},
		addGroup() {
			this.$store.commit('addGroup', {
				id: this.groupListLength + 1,
				title: this.title,
				cards: [],
			});

			this.$router.replace('/');
		},
		goBack() {
			this.$router.go(-1);
		},
	},
	components: {
		vInput,
	},
};
</script>

<style lang="scss">
.add-group {
	max-width: 800px;
	margin: 0 auto;

	&__title {
		text-align: center;
	}

	&__input {}

	&__buttons {
		display: flex;
		justify-content: flex-end;
		margin-top: 10px;
	}

	&__button {
		& + & {
			margin-left: 10px;
		}
	}
}
</style>
