<template>
	<div class="card" ref="card" :class="isGroup.class">
		<h2 class="card__title">{{title}}</h2>
		<div class="card__desc" :class="[cardOpened, cardPerformed]" ref="desc">{{desc}}</div>
		<div
			v-if="isDescBig"
			@click="toggleDesc"
			class="card__toggle">
				{{showAllText}}
		</div>
		<div class="card__controls">
			<v-input
				@change="toggleCheckbox"
				:checked="status"
				type="checkbox"
				label="Отметить выполненым">
			</v-input>
			<div class="card__buttons">
				<button
					@click="toggleGroupList"
					class="card__button button">
					{{isGroup.text}}
				</button>
				<button
					@click="deleteCard"
					class="card__button button button_delete">
					Удалить
				</button>
				<ul
					v-if="!isGroup.bool && groupListOpened"
					class="hover-group-list">
					<li
						v-for="el in groupList"
						:key="el.id"
						@click="addToGroup(el.id)"
						class="hover-group-list__item">
						{{el.title}}
					</li>
					<li
						v-if="!groupListEmpty"
						class="hover-group-list__item">
						Здесь ничего нет
					</li>
				</ul>
				<ul
					v-if="isGroup.bool && groupListOpened"
					class="hover-group-list">
					<li
						v-for="el in clippedGroupList"
						:key="el.id"
						@click="changeGroup(el.id)"
						class="hover-group-list__item">
						{{el.title}}
					</li>
				</ul>
				<modal
					v-if="isModalOpened"
					@click="modalAnswer">
					Вы уверены что хотите удалить карточку?
				</modal>
			</div>
		</div>
	</div>
</template>

<script>
import vInput from '@/components/input';
import modal from '@/components/modal';

export default {
	name: 'card',
	props: {
		type: {
			type: String,
			default: 'default',
		},
		groupId: Number,
		id: Number,
		title: String,
		desc: String,
		status: Boolean,
	},
	data() {
		return {
			isDescBig: false,
			showAllText: 'Раскрыть',
			isOpened: false,
			isPerformed: this.status,
			isModalOpened: false,
			groupListOpened: false,
			groupList: [],
			clippedGroupList: [],
		};
	},
	mounted() {
		if (this.$refs.desc.clientHeight >= 36) {
			this.isDescBig = true;
		} else if (this.$refs.card.classList.contains('card_group')
			&& this.$refs.desc.clientHeight >= 29) {
			this.isDescBig = true;
		}

		this.groupList = this.$store.state.groupList;

		for (let i = 0; i < this.groupList.length; i++) {
			if (this.groupList[i].id !== this.groupId) {
				this.clippedGroupList.push(this.groupList[i]);
			}
		}

		if (!this.clippedGroupList.length) {
			this.clippedGroupList.push({
				title: 'Пусто',
				id: this.groupId,
			});
		}
	},
	methods: {
		toggleDesc() {
			this.isOpened = !this.isOpened;

			if (this.isOpened) {
				this.showAllText = 'Скрыть';
			} else {
				this.showAllText = 'Раскрыть';
			}
		},
		toggleCheckbox(e) {
			this.isPerformed = e;

			if (this.isGroup.bool) {
				this.$store.commit('changeStatusByGroupId', {
					groupId: this.groupId,
					id: this.id,
					status: e,
				});
			} else {
				this.$store.commit('changeStatus', {
					id: this.id,
					status: e,
				});
			}
		},
		toggleGroupList() {
			this.groupListOpened = !this.groupListOpened;
		},
		addToGroup(id) {
			const card = this.$store.getters.getCardFromCardList(this.id);

			this.$store.commit('deleteCardById', this.id);

			this.$store.commit('addCardToGroupCardList', {
				id,
				card,
			});
		},
		changeGroup(id) {
			const card = this.$store.getters.getCardByGroupId({
				groupId: this.groupId,
				id: this.id,
			});

			this.$store.commit('deleteCardByGroupId', {
				groupId: this.groupId,
				id: this.id,
			});

			this.$store.commit('addCardToGroupCardList', {
				id,
				card,
			});
		},
		deleteCard() {
			this.isModalOpened = !this.isModalOpened;
		},
		modalAnswer(e) {
			this.isModalOpened = false;

			if (e) {
				if (this.isGroup.bool) {
					this.$store.commit('deleteCardByGroupId', {
						groupId: this.groupId,
						id: this.id,
					});
				} else {
					this.$store.commit('deleteCardById', this.id);
				}
			}
		},
	},
	computed: {
		cardOpened() {
			return this.isOpened ? 'card__desc_active' : '';
		},
		cardPerformed() {
			return this.isPerformed ? 'card__desc_line_through ' : '';
		},
		isGroup() {
			return this.type === 'group' ? {
				class: 'card_group',
				text: 'Изменить групппу',
				bool: true,
			} : {
				class: '',
				text: 'Добавить в группу',
				bool: false,
			};
		},
		groupListEmpty() {
			return this.groupList.length;
		},
	},
	components: {
		vInput,
		modal,
	},
};
</script>

<style lang="scss">
	.card {
		padding: 10px;
		border: 1px solid $black;

		&__title {
			text-align: center;
		}

		&__desc {
			overflow: hidden;
			position: relative;
			max-height: 36px;
			text-align: justify;
			padding-right: 1em;

			&:before {
				content: '...';
				position: absolute;
				right: 0;
				bottom: 0;
			}

			&:after {
				content: '';
				position: absolute;
				right: 0;
				width: 1em;
				height: 1em;
				margin-top: 0.2em;
				background-color: $teal;
			}

			&_line_through {
				text-decoration: line-through;
			}
		}

		&__toggle {
			margin-top: 10px;
			color: $lime;
			cursor: pointer;

			&:hover {
				color: $ember;
			}
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
				margin-left: 10px;
			}
		}

		&_group {
			.card__title {
				font-size: 1rem;
			}

			.card__desc,
			.card__button,
			.input {
				font-size: .8rem;
			}

			.card__controls {
				flex-direction: column;
			}

			.card__buttons {
				margin-top: 10px;
			}

			.card__desc {
				max-height: 29px;
			}
		}

		.card__desc_active {
			max-height: none;
		}
	}

	.hover-group-list {
		position: absolute;
		left: 0;
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
		}
	}
</style>
