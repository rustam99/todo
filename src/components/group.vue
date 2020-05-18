<template>
	<div class="group">
		<h2 class="group__title">{{title}}</h2>
		<card-list type="group" :groupId="id" :list="list"/>
		<div class="group__controls">
			<button
				@click="toggleHoverList"
				class="group__button button">
				Добавить карточку
			</button>
			<button
				@click="deleteGroup"
				class="group__button button button_delete">
				Удалить группу
			</button>
			<ul v-if="isOpenedHoverList" class="hover-card-list">
				<li
					v-for="el in cardList"
					:key="el.id"
					@click="addCardToGroup(el.id)"
					class="hover-card-list__item">
					{{el.title}}
				</li>
				<li
					v-if="!cardListEmpty"
					class="hover-card-list__item hover-card-list__item_empty">
					Здесь ничего нет
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import cardList from '@/components/card_list';

export default {
	name: 'group',
	props: {
		id: Number,
		title: String,
		list: Array,
	},
	data() {
		return {
			cardList: [],
			isOpenedHoverList: false,
		};
	},
	created() {
		this.cardList = this.$store.state.cardList;
	},
	methods: {
		toggleHoverList() {
			this.isOpenedHoverList = !this.isOpenedHoverList;
		},
		addCardToGroup(id) {
			const card = this.$store.getters.getCardFromCardList(id);

			this.$store.commit('deleteCardById', id);

			this.$store.commit('addCardToGroupCardList', {
				id: this.id,
				card,
			});

			this.isOpenedHoverList = !this.isOpenedHoverList;
		},
		deleteGroup() {
			this.$store.commit('deleteGroupById', this.id);
		},
	},
	computed: {
		cardListEmpty() {
			return this.cardList.length;
		},
	},
	components: {
		cardList,
	},
};
</script>

<style lang="scss">
	.group {
		padding: 10px;
		border: 1px solid $black;

		&__title {
			text-align: center;
		}

		&__controls {
			display: flex;
			justify-content: flex-end;
			position: relative;
		}

		&__button {
			& + & {
				margin-left: 10px;
			}
		}
	}

	.hover-card-list {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 100%;
		margin-top: 10px;
		max-width: 200px;
		max-height: 400px;
		overflow: auto;
		padding: 10px;
		box-sizing: border-box;
		background-color: $black;
		z-index: 100;

		&__item {
			color: $white;
			cursor: pointer;

			&:hover {
				color: $blue;
			}
			& + & {
				margin-top: 10px;
			}
		}
	}
</style>
