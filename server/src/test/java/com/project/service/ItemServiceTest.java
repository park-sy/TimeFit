package com.project.service;

import com.project.domain.Item;
import com.project.domain.ItemComment;
import com.project.domain.ItemImages;
import com.project.repository.ItemCommentRepository;
import com.project.repository.ItemImgRepository;
import com.project.repository.ItemRepository;
import com.project.request.ItemCommentCreate;
import com.project.request.ItemSearch;
import com.project.response.ItemResponse;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ItemServiceTest {

    @Autowired
    private ItemService itemService;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemCommentRepository itemCommentRepository;

    @Autowired
    private ItemImgRepository itemImgRepository;

    @BeforeEach
    void clean(){
        itemRepository.deleteAll();
    }

    @Test
    @DisplayName("아이템 등록")
    void test1(){
        Item requestItem = Item.builder()
                .name("상품")
                .season("계절").build();

        itemRepository.save(requestItem);

        Assertions.assertEquals(1L,itemRepository.count());
        Item item = itemRepository.findAll().get(0);
        assertEquals("상품", item.getName());
        assertEquals("계절", item.getSeason());
    }

    @Test
    @DisplayName("페이지 불러오기")
    void test2(){
        //given
        List<Item> requestItems = IntStream.range(0,20)
                .mapToObj(i -> Item.builder()
                        .name("상품 " +i)
                        .season("계절 "+i)
                        .build()).collect(Collectors.toList());
        itemRepository.saveAll(requestItems);
        ItemSearch itemSearch = ItemSearch.builder()
                .page(1)
                .build();

        //when
        List<ItemResponse> items = itemService.getList(itemSearch);

        //then
        assertEquals(10L, items.size());
        assertEquals("상품 19", items.get(0).getName());
        assertEquals("상품 15", items.get(4).getName());


    }
    @Test
    @DisplayName("아이템 이미지 불러오기")
    void test3(){
        //given
        Item requestItem = Item.builder()
                .name("상품")
                .season("계절").build();

        itemRepository.save(requestItem);

        ItemCommentCreate create = ItemCommentCreate.builder()
                .comment("댓글입니다.")
                .item(requestItem).build();
        itemService.write(requestItem.getId(),create);

        ItemImages images1 = ItemImages.builder()
                .originFileName("123")
                .newFileName("123")
                .item(requestItem).build();
        itemImgRepository.save(images1);

        ItemImages images2 = ItemImages.builder()
                .originFileName("456")
                .newFileName("444")
                .item(requestItem).build();
        itemImgRepository.save(images2);

        Item item = itemRepository.findAll().get(0);
        assertEquals("상품", item.getName());
        assertEquals("계절", item.getSeason());
        Set<ItemImages> itemImages = item.getImages();
        System.out.println(item.getImages());
    }

    @Test
    @DisplayName("댓글 작성하기")
    void test4(){
        //given
        Item requestItem = Item.builder()
                .name("상품")
                .season("계절").build();

        itemRepository.save(requestItem);

        ItemCommentCreate create = ItemCommentCreate.builder()
                .comment("댓글입니다.")
                .item(requestItem).build();
        itemService.write(requestItem.getId(),create);

        assertEquals(1L, itemRepository.count());
        Item item = itemRepository.findAll().get(0);
        assertEquals("상품", item.getName());
        assertEquals("계절", item.getSeason());

        assertEquals(1L, itemCommentRepository.count());
        ItemComment itemComment = itemCommentRepository.findAll().get(0);
        assertEquals("댓글입니다.", itemComment.getComment());


    }
}