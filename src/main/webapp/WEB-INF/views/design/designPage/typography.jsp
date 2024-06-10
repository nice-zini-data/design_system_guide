<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="subPage">
    <div class="subCommonTextBox">
        <p class="subCommonTitle">Naming</p>
    </div>

    <div class="typoNaming tac">
        <img src="/assets/images/typo_img.png" alt=""/>
    </div>

    <div class="subCommonTextBox">
        <p class="subCommonTitle">Title</p>
        <p class="subCommonText">헤드라인, 타이틀, 서브타이틀에 사용하며 경우에 따라 콘텐츠 영역에 사용할 수 있습니다. (키패드, 인증번호 등)</p>
    </div>
    
    <div class="typo_table mt40">
        <div class="Bg"><p>PC</p></div>
        <div class="Bg"><p>MOBILE (480~)</p></div>
        <table>
            <colgroup>
                <col width="20%"/>
                <col width="20%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
            </colgroup>
            <tr>
                <th>Type</th>
                <th>Style (Weight)</th>
                <th>Size</th>
                <th>Line-height</th>
                <th>Letter-spacing</th>
                <th>Size</th>
                <th>Line-height</th>
                <th>Letter-spacing</th>
            </tr>
            <tr>
                <td><p class="tit_xl_b">XL 36</p></td>
                <td><p class="tit_xl_b">Bold</p></td>
                <td>36px</td>
                <td>134%</td>
                <td>-0.5%</td>
                <td>28px</td>
                <td>142%</td>
                <td>-0.5%</td>
            </tr>
            <tr>
                <td><p class="tit_l_b">L 28</p></td>
                <td><p class="tit_l_b">Bold</p> <p class="tit_l_sb">semibold</p></td>
                <td>28px</td>
                <td>142%</td>
                <td>-0.5%</td>
                <td>24px</td>
                <td>148%</td>
                <td>-0.8%</td>
            </tr>
            <tr>
                <td><p class="tit_m_b">M 24</p></td>
                <td><p class="tit_m_b">Bold</p><p class="tit_m_sb">semibold</p></td>
                <td>24px</td>
                <td>148%</td>
                <td>-0.8%</td>
                <td>20px</td>
                <td>158%</td>
                <td>-1%</td>
            </tr>
            <tr>
                <td><p class="tit_s_b">S 20</p></td>
                <td><p class="tit_s_b">Bold</p><p class="tit_s_sb">semibold</p><p class="tit_s_m">Medium</p></td>
                <td>20px</td>
                <td>158%</td>
                <td>-1%</td>
                <td>18px</td>
                <td>158%</td>
                <td>-1%</td>
            </tr>
            <tr>
                <td><p class="tit_xs_b">XS 18</p></td>
                <td><p class="tit_xs_b">Bold</p><p class="tit_xs_sb">semibold</p><p class="tit_xs_m">Medium</p></td>
                <td>18px</td>
                <td>158%</td>
                <td>-1%</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
</div>

<script>
    $(function(){

        $('.typo_table p').click(function(){
            var copyText = $('.typo_table p');



        });

    });
</script>