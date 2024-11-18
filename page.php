
<?php
    get_header();
    while(have_posts()){
        the_post(); 
        pageBanner(array(
          'title' => 'Test title for page',
          'subtitle' =>'Test subtitle for our page',
          'background-photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/%E0%A6%85%E0%A6%AA%E0%A6%B0%E0%A6%BE%E0%A6%9C%E0%A7%87%E0%A6%AF%E0%A6%BC_%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE_06.jpg/1200px-%E0%A6%85%E0%A6%AA%E0%A6%B0%E0%A6%BE%E0%A6%9C%E0%A7%87%E0%A6%AF%E0%A6%BC_%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE_06.jpg?20180905031413'
        )); 
        ?>



    <?php
      $theParent= wp_get_post_parent_id(get_the_ID());
      if($theParent){
    ?>
    <div class="container container--narrow page-section">
      <div class="metabox metabox--position-up metabox--with-home-link">
        <p>
          <a class="metabox__blog-home-link" href="<?php echo get_permalink($theParent)?>"><i class="fa fa-home" aria-hidden="true"></i> 
          Back to <?php echo get_the_title($theParent) ?></a> <span class="metabox__main"><?php the_title(); ?></span>
        </p>
      </div>

    <?php

      }
    ?>    
    <?php 
      $hasChild = get_pages(array(
        'child_of' => get_the_ID()
      ));
      
      if($theParent or $hasChild)
      {
    ?>   
      <div class="page-links">
        <h2 class="page-links__title"><a href="<?php the_permalink($theParent) ?>"><?php echo get_the_title($theParent) ?></a></h2>
        <ul class="min-list">
          <?php
            if($theParent){
              $findChildOf=$theParent; 
           }else{
              $findChildOf=get_the_ID(); 
           }

            wp_list_pages(array(
              'title_li' => NULL,
              'child_of' => $findChildOf,
              'sort_column' => 'menu_order'
            ));
          ?>
        </ul>
      </div>
    <?php
      }
    ?>        
      <div class="generic-content">
        <?php the_content();?>
      </div>
    </div>
<?php
        
    }

    get_footer();
?>