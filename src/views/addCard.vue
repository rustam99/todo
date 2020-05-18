<template>
	<div class="add-card">
		<h1 class="add-card__title">Создание карточки</h1>
		<v-input
			@input="changeTitle"
			class="add-card__title"
			placeholder="Введите название"/>
		<v-input
			@input="changeDesc"
			class="add-card__desc"
			type="textarea"
			placeholder="Введите описание"/>
		<div class="add-card__controls">
			<v-input
				@change="changeStatus"
				type="checkbox"
				label="Отметить выполненым"/>
			<div class="add-card__buttons">
				<button @click="addCard" class="add-card__button button">Создать</button>
				<button @click="toggleGroupList" class="add-card__button button">Добавить в группу</button>
				<button @click="goBack" class="add-card__button button button_delete">Отменить</button>
				<ul
					v-if="groupListOpened"
					class="hover-group-list">
					<li
						v-for="el in groupList"
						:key="el.id"
						@click="addToGroup(el.id)"
						class="hover-group-list__item">{{el.title}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import vInput from '@/components/input';

export default {
	name: 'addCard',
	data() {
		return {
			title: '',
			desc: '',
			status: false,
			cardLength: '',
			groupListOpened: false,
			groupList: [],
		};
	},
	created() {
		// Так как без сервера вручную приходится добовлять id
		this.cardLength = this.$store.state.cardList.length;
		this.groupList = this.$store.state.groupList;
	},
	methods: {
		changeTitle(e) {
			this.title = e;
		},
		changeDesc(e) {
			this.desc = e;
		},
		changeStatus(e) {
			this.status = e;
		},
		addCard() {
			this.$store.commit('addCardToCardList', {
				id: this.cardLength + 1,
				title: this.title,
				desc: this.desc,
				status: this.status,
			});

			this.$router.replace('/');
		},
		toggleGroupList() {
			this.groupListOpened = !this.groupListOpened;
		},
		addToGroup(id) {
			const groupCardListLength = this.$store.getters.getGroupById(id).cards.length;
			this.$store.commit('addCardToGroupCardList', {
				id,
				card: {
					id: groupCardListLength + 1,
					title: this.title,
					desc: this.desc,
					status: this.status,
				},
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
	.add-card {
		max-width: 800px;
		margin: 0 auto;

		&__title {
			text-align: center;
		}

		&__desc {
			margin-top: 20px;
		}

		&__controls {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 20px;
		}

		&__buttons {
			position: relative;
		}

		&__button {
			& + & {
				margin-left: 20px;
			}
		}
	}

	.hover-group-list {
		left: 50%;
		transform: translateX(-50%);
	}
</style>
